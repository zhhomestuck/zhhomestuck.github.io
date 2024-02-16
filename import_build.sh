#!/bin/bash
ruby -r rubygems -e 'require "jekyll-import";JekyllImport::Importers::Blogger.run({"source"=>"./blog.xml","no-blogger-info"=>true,"replace-internal-link"=>false})'

python3 ./scripts/preprocess.py
cp blog-plain.txt ../zhhomestuck.github.io/backups/blog-plain.txt
cp blog.xml ../zhhomestuck.github.io/backups/blog.xml

bundle exec jekyll build

python3 ./scripts/postprocess.py
python3 ./scripts/index_updater.py
python3 ./scripts/write_flash_index.py

mv ../zhhomestuck.github.io/p/infos/* ../zhhomestuck.github.io
mv ../zhhomestuck.github.io/p/index.html ../zhhomestuck.github.io/
mv ../zhhomestuck.github.io/p/404.html ../zhhomestuck.github.io/

echo "finished updating site"

