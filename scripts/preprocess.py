import io
import os
import re

POST_DIR_PATH = "./_posts"
PAGE_DIR_PATH = "./_pages"
POST_LIST = list(os.listdir(POST_DIR_PATH))
PAGE_LIST = list(os.listdir(PAGE_DIR_PATH))
COMBINED_FILEPATH_LIST = (
    [os.path.join(POST_DIR_PATH, n) for n in sorted(POST_LIST)]
    + [os.path.join(PAGE_DIR_PATH, n) for n in sorted(PAGE_LIST)]
)


def strip_xml_tag(string):
    string += "\n"
    string = re.sub(r"(<br>)|(<br/>)|(<br />)|(</br>)", "\n", string)

    # remove non-displayed HTML elements
    string = re.sub(r"<!--(?:(?!<!--|-->)[\S\s])*-->", "", string)
    string = re.sub(r"<script(?:(?!<script|</script>)[\S\s])*</script>", "", string)
    string = re.sub(r"<style(?:(?!<style|</style>)[\S\s])*</style>", "", string)
    string = re.sub(r"<button(?:(?!<button|</button>)[\S\s])*</button>", "", string)

    # remove XML tags
    string = re.sub(r"<[^<^>]+>", "", string)

    string = re.sub(r"\n[\s]+", "\n", string)
    string = re.sub(r" +", " ", string)
    return string

def make_plain_blog():
    print("making blog-plain.txt...")
    replace_dict = {
        "&nbsp;"    : " ",
        "&gt;"      : ">",
        "&lt;"      : "<",
        "&amp;"     : "&",
        "&#42;"     : "*",
        "&#124;"    : "|",
        "&#65292;"  : "，",
        "&#12290;"  : "。",
        "&#65281;"  : "！",
        "&#65311;"  : "？",
        "&#12300;"  : "「",
        "&#12301;"  : "」",
    }

    transcript_page_list = []

    content_string = ""
    with open("blog-plain.txt", 'w+', encoding='utf-8') as blog_plain:
        for filepath in COMBINED_FILEPATH_LIST:
            if filepath in transcript_page_list:
                break
            file_lines = io.open(filepath, 'r', encoding='utf-8').readlines()[1:]
            # get title & find the end of front matter then remove front matter
            title_line = ""
            tidied_lines = []
            end_front_mat = 0
            for i, line in enumerate(file_lines):
                if "title:" in line:
                    title_line = file_lines[i][7:]
                if line == "---\n":
                    end_front_mat = i+1

            content_string = "".join(file_lines[end_front_mat:])
            # check if it is game; true then use page content
            if "純文字版本" in content_string:
                for page_name in PAGE_LIST:
                    if page_name in content_string:
                        page_path = os.path.join(PAGE_DIR_PATH, page_name)
                        with open(page_path, 'r', encoding='utf-8') as page_file:
                            page_lines = page_file.readlines()[6:]
                        content_string = title_line + "".join(page_lines)
                        transcript_page_list.append(page_path)
                        break
            else:
                content_string = title_line + content_string

            content_string = strip_xml_tag(content_string)
            for key in replace_dict.keys():
                content_string = re.sub(key, replace_dict[key], content_string)
            blog_plain.write(content_string)
            blog_plain.write("\n")

# end def make_raw_blog

def give_layouts():
    print("giving layouts in _posts...")
    tags = ["s", "sbahj", "trickster", "x2combo"]
    layoutname = ["post_s", "post_sbahj", "post_trickster", "post_x2combo"]
    for post_name in POST_LIST:
        post_path = os.path.join(POST_DIR_PATH, post_name)
        with open(post_path, 'r', encoding='utf-8') as post_file:
            file_string = post_file.read()
        #if re.search("- sbahj", file_string) :
        #    continue
        for index, tag in enumerate(tags) :
            if re.search("- "+tag+"\n", file_string):
                suffix = ""
                if tag == "x2combo":
                    if int(post_name[11:17]) % 2 == 0:
                        suffix = "_left"
                    else:
                        suffix = "_right"
                file_string = file_string.replace(
                    'layout: post\n',
                    f'layout: {layoutname[index]}{suffix}\n'
                )
                with open(post_path, 'w', encoding='utf-8', newline='\n') as post_file:
                    post_file.write(file_string)

# def escape_markdowns():
#     print("escaping markdown characters...")
#     for post_name in POST_LIST:
#         post_path = os.path.join(POST_DIR_PATH, post_name)
#         with open(post_path, "r", encoding='utf-8') as post_file:
#             post_lines = post_file.readlines()
#         # find the end of front matter
#         begin_front_mat = -1
#         end_front_mat = -1
#         for index, line in enumerate(post_lines):
#             if line == "---\n":
#                 if begin_front_mat < 0:
#                     begin_front_mat = index
#                 else:
#                     end_front_mat = index + 1
#                     break
#         yml_string = "".join(post_lines[:end_front_mat])
#         story_string = "".join(post_lines[end_front_mat:])
#         if story_string[0] == '\n':
#             story_string = story_string[1:]
#         story_string = f'<div id="no-markdown" markdown="0">{story_string}<!-- end of no markdown --></div>'
#         # The markdown="0" attribute will drop after markdown parser
#         with open(post_path, 'w', encoding='utf-8', newline='\n') as post_file:
#             post_file.write(yml_string+story_string)

def replace_strings():
    print("replacing strings and links...")
    for post_name in POST_LIST:
        post_path = os.path.join(POST_DIR_PATH, post_name)
        with open(post_path, encoding='utf-8') as post_file:
            file_string = post_file.read()

        #if re.search("<table>", file_string) :
        #    file_string = re.sub("</?table>|</?tbody>|</?tr>|</?td>", "", file_string)

        if re.search("AC_FL_RunContent", file_string):
            file_string = file_string.replace(
                " 'http://cdn.mspaintadventures.com/storyfiles",
                " 'https://www.homestuck.com/flash"
            )

        # sources host on github was non-security linked, change it to security
        file_string = file_string.replace(
            "http://zhhomestuck.github.io",
            "https://zhhomestuck.github.io"
        )

        # change mpsa link to homestuck.com
        file_string = re.sub(
            "https?://(cdn|www).mspaintadventures.com/storyfiles/hs2/",
            "https://www.homestuck.com/images/storyfiles/hs2/",
            file_string
        )

        # unlink mpsa AC.js
        file_string = re.sub(
            r"<[=\"a-z ]*src=\"http.+AC_RunActiveContent\.js\"[=\"a-z ]*><\/script>",
            "",
            file_string
        )

        # redirect site name
        file_string = re.sub(
            r"https?://zhhomestuck.blogspot.(tw|com)/(p|[/0-9]{7})/",
            "./",
            file_string
        )

        # replace unnessecery strings
        file_string = file_string.replace("//end AC code", "")

        # replace wrongly used id attr
        file_string = file_string.replace(
            'span id="note"',
            'span class="note"'
        )
        file_string = file_string.replace(
            'id="log-outer-outer"',
            'class="log-outer-outer"'
        )

        with open(post_path, "w", encoding='utf-8', newline='\n') as post_file:
            post_file.write(file_string)

if __name__ == "__main__":
    print("pre-processing...")
    # p_values_check()
    make_plain_blog()
    give_layouts()
    # escape_markdowns()
    replace_strings()
