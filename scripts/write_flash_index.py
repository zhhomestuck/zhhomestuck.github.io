# encoding = utf-8
import io
import os
import re
print("write flash/index.html")
path = ""
config_file = open("_config.yml", "r", encoding = "utf-8-sig")
for line in config_file.readlines() :
    a = line.split()
    if a[0] == "destination:" :
        path = a[1][:-1] + 'flash/'
        break
index_page = open(path+"index.html", "w", encoding = "utf-8-sig")
index_page.write("<html><body><ul>")
for filenum, filename in enumerate(sorted(os.listdir(path))) :
    if filename == "index.html": continue
    index_page.write("<li><a href=\""+filename+"\">"+filename+"</a></li>")
index_page.write("</ul></body></html>")
