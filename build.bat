call bundle exec jekyll build

python scripts/postprocess.py
python scripts/index_updater.py
python scripts/write_flash_index.py

move ..\zhhomestuck.github.io\p\infos\* ..\zhhomestuck.github.io\
move ..\zhhomestuck.github.io\p\index.html ..\zhhomestuck.github.io\
move ..\zhhomestuck.github.io\p\404.html ..\zhhomestuck.github.io\

echo "finished updating site"
