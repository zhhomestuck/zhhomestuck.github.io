#!/usr/bin/env python3
import time
import feedparser

# Parse the Atom feed
with open('./blog.xml', 'r', encoding='utf-8') as f:
    atom_data = f.read()

feed = feedparser.parse(atom_data)

for entry in feed.entries:
    if entry['blogger_type'] != 'POST':
        continue
    title = entry['title']
    content = entry['content'][0]['value']
    tags = entry.get('category', '')
    published_iso = entry['published']
    published_ymd = time.strftime(r'%Y-%m-%d', entry['published_parsed'])
    filename = entry['blogger_filename'].split('/')[-1]
    with open(f'./_posts/{published_ymd}-{filename}', 'w+', encoding='utf8') as f:
        # front matter
        f.write(
            f'title: {title}\n'
            f'layout: post\n'
            f'date: {published_iso}\n'
        )
        if tags != '':
            f.write(f'tags: [{tags}]\n')
        f.write('---\n')
        f.write(content)
