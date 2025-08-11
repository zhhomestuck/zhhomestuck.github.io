#!/usr/bin/env python3
import feedparser
from feedgen.feed import FeedGenerator

input_file = './blog.xml'
output_file = './blog.rss'

# Parse the Atom feed
with open(input_file, 'r', encoding='utf-8') as f:
    atom_data = f.read()

feed = feedparser.parse(atom_data)

# Create RSS feed
fg = FeedGenerator()

fg.title(feed.feed.get('title', ''))
fg.link(href=feed.feed.get('link', ''), rel='alternate')
fg.description(feed.feed.get('subtitle', feed.feed.get('title', '')))

if 'updated' in feed.feed:
    fg.pubDate(feed.feed.updated)

for entry in feed.entries:
    fe = fg.add_entry()
    fe.title(entry.get('title', ''))
    if 'published' in entry:
        fe.pubDate(entry.published)
    elif 'updated' in entry:
        fe.pubDate(entry.updated)
    if 'id' in entry:
        fe.guid(entry.id)

# Write RSS file
fg.rss_file(output_file)
print(f"RSS feed written to {output_file}")
