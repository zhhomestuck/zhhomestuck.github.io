import os
from datetime import datetime
print("updating index.html...")
with open('./_site/p/index.html', 'r', encoding = "utf8") as f:
    file_content = f.read()
now_date = datetime.now()
file_content = file_content.replace("now_date", now_date.strftime("%Y-%m-%d"))

pagename_list = sorted(os.listdir("_posts"))

update_date = pagename_list[-1][:10]
update_list = [x for x in pagename_list if x[:10]==update_date]
update_page_link = "/p/" + update_list[0][11:17]

update_page_title = ""
with open("_posts/"+update_list[0], "r", encoding = "utf-8-sig") as f:
    for line in f.readlines():
        if line[0:5]=="title":
            update_page_title = line[7:-1]
            break

file_content = file_content.replace("update_date", update_date) \
                           .replace("update_link", update_page_link) \
                           .replace("update_page_title", update_page_title) \
                           .replace("update_page_num", str(len(update_list)))

with open('./_site/index.html', 'w', encoding = "utf8") as f :
    f.write(file_content)
