#!/usr/bin/env python3
import time
import yaml
import feedparser

# Parse the Atom feed
with open('./feed.atom', 'r', encoding='utf-8') as f:
    atom_data = f.read()

feed = feedparser.parse(atom_data, sanitize_html=False)
print('start transform blogger atom file to posts')
for entry in feed.entries:
    if entry['blogger_type'] != 'POST':
        continue
    title = entry['title']
    content = entry['content'][0]['value']
    tag = entry.get('category', '')
    published_iso = entry['published']
    published_ymd = time.strftime(r'%Y-%m-%d', entry['published_parsed'])
    filename = entry['blogger_filename'].split('/')[-1]

    with open(f'./_posts/{published_ymd}-{filename}', 'w+', encoding='utf8') as f:
        # front matter
        f.write('---\n')
        header = {
            'title': title,
            'layout': 'post',
            'date': published_iso,
        }
        if tag != '':
            header['tags'] = [tag]
        f.write(yaml.safe_dump(header, allow_unicode=True))
        f.write('---\n')
        f.write(content)
