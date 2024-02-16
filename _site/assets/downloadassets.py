import requests
import pandas as pd
import os
import re

embed_temp = open('embed_temp.html', 'r', encoding='utf-8').read()
translated_flash_list = [filename[:5] for filename in os.listdir('../flash')]

def downloadasset(pageurl: str):

    r = requests.get(pageurl)

    html5_animation_file_path_begin = r.text.find('<script src="/assets/hs2/') + len('<script src="')
    html5_animation_file_path_end   = html5_animation_file_path_begin + 18 + 64 + 3 # 18: '/assets/hs2/xxxxx-' 64: hash 3: '.js'

    animation_container_script_begin = r.text.find('<script>\n$(document).ready(function() {\n    // Make content area responsive during preload')
    animation_container_script_end   = r.text.find('});\n\n</script>') + len('});\n\n</script>')
    canvas_width_height_text = r.text[r.text.find('<canvas id="canvas"') : r.text.find('</canvas>')]

    width  = canvas_width_height_text[canvas_width_height_text.find('width') + 7  : canvas_width_height_text.find('height') - 2]
    height = canvas_width_height_text[canvas_width_height_text.find('height') + 8 : canvas_width_height_text.find('style') - 2]

    html5_animation_file_path = r.text[html5_animation_file_path_begin : html5_animation_file_path_end]
    jsfilename = html5_animation_file_path.split("-")[0].split("/")[-1]
    dirname = jsfilename if jsfilename[0] == '0' else '0' + jsfilename[1:]
    animation_container_script = r.text[animation_container_script_begin : animation_container_script_end]

    if not dirname.isdigit():
        print('Not a HTML5 animation page')
        return

    try:
        os.mkdir(dirname)
    except FileExistsError as e:
        print(f'Directory {dirname} already exists')
        return
    
    # print(html5_animation_file_path)
    # print(animation_container_script)
    # print(width, height)

    # write embed.html
    global embed_temp
    embed = embed_temp.replace('[[ filename ]]', jsfilename)
    embed = embed.replace('[[ animation_container_script ]]', animation_container_script)
    embed = embed.replace('[[ width ]]', width)
    embed = embed.replace('[[ height ]]', height)
    open(f'{dirname}/embed.html', 'w+', encoding='utf-8').write(embed)

    # download js file
    jsfiletext = requests.get('https://www.homestuck.com' + html5_animation_file_path).text

    # find all asset url in js file
    srcs_begin = [m.start()+6 for m in re.finditer('{src:"', jsfiletext)]
    srcs_end   = [m.start() for m in re.finditer('",id:"', jsfiletext)]
    srcs = [jsfiletext[b:e] for b, e in zip(srcs_begin, srcs_end)]
    # print(srcs)

    # download all asset files
    for src in srcs:
        if '.' not in src and 'hs2' not in src:
            print(f'invalid asset src: {assetname}')
            continue
        assetname = src.split("/")[-1]
        filecontent = requests.get('https://www.homestuck.com'+src).content
        open(f'{dirname}/{assetname}', 'wb+').write(filecontent)
        jsfiletext = jsfiletext.replace(src, assetname)

    # store js file
    open(f'{dirname}/{jsfilename}.js', 'w+').write(jsfiletext)

    global translated_flash_list
    if dirname in translated_flash_list:
        print('has translated flash file')
        open(f'{dirname}/has_translated_flash_file', 'wb')

df = pd.read_csv('Homestuck Flash Conversions.csv')
for index, row in df.iterrows():
    if row['HTML5'] == 1:
        print(row['URL'], row["Title"])
        downloadasset(row['URL'])
        print('')
