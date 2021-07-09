#!/usr/bin/env python3

from urllib.request import urlopen
import json
import re
from bs4 import BeautifulSoup
import os.path


def get_html():
    if os.path.exists('page4.htm'):
        print('using cached html file')
        with open('page4.htm', 'r') as fd:
            return str(fd.read())
    else:
        print('fetching html file')
        url = "http://www.tartan37.com/page4.htm"
        page = urlopen(url)
        html = str(page.read())
        with open('page4.htm', 'w+') as fd:
            fd.write(html)
        return html


def parse(hull: int, blurb: str):
    soup = BeautifulSoup(blurb, 'html.parser')
    owner = dict()
    result = {"owner": owner}
    for a in soup.find_all('a', href=True):
        if a['href'].startswith('mailto:'):
            if 'email' not in owner:
                owner['email'] = a['href'][7:].lower()
        elif a['href'].startswith('http'):
            result['web'] = a['href']
        else:
            print("Found the URL:", a['href'])
    for img in soup.find_all('img'):
        result['img'] = str(img['src']).lower()

    s = sanitize(blurb)
    result['name'] = s[s.find(":") + 1:s.find("--")].strip()
    if result['name'].startswith('TI\'R NA'):
        result['name'] = 'TI\'R NA NO\'G'

    result['type'] = s[s.find("--"):s.rfind('--')].lstrip("--").strip().lstrip("(").rstrip(")")
    blurb = re.sub('\s+', ' ', re.sub('\S*@\S*\s?', '', s[s.rfind("--"):].lstrip("--").strip())
                   .replace('email', '')
                   .replace('e-mail', ''))
    result['blurb'] = blurb
    result['location'] = ''
    owner['name'] = blurb[:blurb.find(',')].strip()
    owner['phone'] = ''

    return result


def sanitize(blurb: str):
    s = blurb.replace("<br>", '') \
        .replace("\\n", '') \
        .replace("\\", '') \
        .replace("</font>", '') \
        .replace("&nbsp;", '') \
        .replace("&amp;", '&') \
        .replace('<font color="#000080">', '') \
        .replace('<p align="left"><font face="Arial">', '') \
        .replace("<b>", '') \
        .replace("</b>", '') \
        .replace("</p>", '') \
        .replace(";)", '') \
        .replace("&quot;", '\"') \
        .replace("&quot", '\"') \
        .replace('<p align="left">', '') \
        .replace('<font color="#000080" face="Arial">', '') \
        .replace('<font face="Arial">', '') \
        .replace('<font face="Arial" color="#000080"', '')
    soup = BeautifulSoup(s, 'html.parser')
    return re.sub('\s+', ' ', soup.get_text())


def write_results():
    html = get_html()
    results = []
    for i in range(1, 487):
        start = html.find("Hull #{}:".format(i))
        end = html.find("Hull", start + 1)
        entry = {
            **{
                "hull": i
            },
            **parse(i, html[start: end])
        }
        results.append(entry)

    with open('src/assets/fleet.json', 'w') as rjson:
        s = json.dumps(results, indent=2)
        rjson.write(s)


if __name__ == '__main__':
    # write_results()
    f = 'src/assets/fleet.json'
    if os.path.isfile(f):
        print('is file')

    with open('src/assets/fleet.json') as fjson:
        results = []
        for each in json.load(fjson):
            owner = each['owner']
            # if 'email' in owner.keys():
            #     owner.pop('email')
            # if 'phone' in owner.keys():
            #     owner.pop('phone')
            blurb = each['blurb']
            on = owner['name']
            if len(on) > 0 and on in blurb:
                print('removing owner name [{}] from blurb \n'.format(on))
                each['blurb'] = blurb.replace(owner['name'], '').strip(',').strip().strip('-').strip()

            results.append(each)

        with open('src/assets/fleet.json', 'w') as rjson:
            s = json.dumps(results, indent=2)
            rjson.write(s)

            # each['owner'].pop('phone')
