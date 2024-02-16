import os
import re

SITE_PATH = "./_site"
POST_LIST = list(os.listdir(SITE_PATH))

def p_values_check():
    print("checking continuity of p-values of post in build")
    for filename in POST_LIST:
        filepath = os.path.join(SITE_PATH, filename)
        if not filename.split('.')[0].isdigit() or filename == '404.html':
            continue
        try:
            with open(filepath, encoding = 'utf-8-sig') as f:
                file_string = f.read()
        except:
            continue
        if '...在簡中翻譯站繼續' in file_string:
            continue
        b = file_string.find('id="newer-page-link"') + 20
        possible_range  = file_string[b : b + 40]
        next_p_pos = possible_range.find('./00')
        if next_p_pos == -1:
            print(f"cannot find p value at {filename}")
            input("Press Enter to continue")
        else:
            next_page_url = possible_range[next_p_pos+2:next_p_pos+8]
            # print(next_page_url, int(filename[:6]), int(next_page_url))
            if 'x2combo' in file_string and int(filename[:6]) % 2 == 0:
                if int(filename[:6]) != int(next_page_url) - 2:
                    print(f"p value error at {filename}: non-continueous")
                    input("Press Enter to continue")
            else:
                if int(filename[:6]) != int(next_page_url) - 1:            
                    print(f"p value error at {filename}: non-continueous")
                    input("Press Enter to continue")

def replace_strings():
    print("replacing things in builded pages")
    for filename in POST_LIST:
        try:
            file_string = open(SITE_PATH+filename, encoding = 'utf-8-sig').read()
        except:
            continue
        # change every "&lt;" if it is NOT behind "!" or " "
        file_string = re.sub(r"&lt;(?![! ])", "<", file_string)
        # change every "&gt;" if it is NOT behind "!" or ";"
        file_string = re.sub(r"&gt;(?![!;])", ">", file_string)
        # take out file extention
        file_string = file_string.replace(".html", "")
        file_string = file_string.replace("&amp;", "&")
        file_string = file_string.replace("…", "...")
        filepath = os.path.join(SITE_PATH, filename)
        with open(filepath, "w", encoding = 'utf-8-sig') as f:
            f.write(file_string)

if __name__ == "__main__":
    print("post-processing...")
    p_values_check()
    replace_strings()