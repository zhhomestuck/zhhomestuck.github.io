ruby -r rubygems -e 'require "jekyll-import"; JekyllImport::Importers::Blogger.run({"source"=^>"blog.xml","no-blogger-info"=^>true,"replace-internal-link"=^>false})'

python scripts\preprocess.py
copy blog-plain.txt ..\zhhomestuck.github.io\backups\blog-plain.txt
copy blog.xml ..\zhhomestuck.github.io\backups\blog.xml

call bundle exec jekyll build

python scripts/postprocess.py
python scripts/index_updater.py
python scripts/write_flash_index.py

move ..\zhhomestuck.github.io\p\infos\* ..\zhhomestuck.github.io\
move ..\zhhomestuck.github.io\p\index.html ..\zhhomestuck.github.io\
move ..\zhhomestuck.github.io\p\404.html ..\zhhomestuck.github.io\

echo "finished updating site"
