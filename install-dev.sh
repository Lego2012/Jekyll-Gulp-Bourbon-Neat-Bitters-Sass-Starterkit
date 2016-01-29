#!/bin/bash
bundle install
echo '++++++++++++++++++++'
echo '++++++++++++++++++++'
echo 'Bundle installed.'
echo '++++++++++++++++++++'
echo '++++++++++++++++++++'
bower install
echo '++++++++++++++++++++++++++++'
echo '++++++++++++++++++++++++++++'
echo 'Bower programs installed.'
echo '++++++++++++++++++++++++++++'
echo '++++++++++++++++++++++++++++'
mv _assets/_vendor/normalize.css/normalize.css _assets/_vendor/normalize.css/normalize.scss
echo '+++++++++++++++++++++++'
echo '+++++++++++++++++++++++'
echo 'normalize.css renamed.'
echo '+++++++++++++++++++++++'
echo '+++++++++++++++++++++++'
cd _assets/_vendor
bourbon install
neat install
bitters install
cd ../../
echo '+++++++++++++++++++++++++++++++++++++'
echo '+++++++++++++++++++++++++++++++++++++'
echo 'Bourbon, Neat and Bitters installed.'
echo '+++++++++++++++++++++++++++++++++++++'
echo '+++++++++++++++++++++++++++++++++++++'
cp _assets/_scss/_bitters-adjusted/_grid-settings.scss _assets/_vendor/base/
cp _assets/_scss/_bitters-adjusted/_base.scss _assets/_vendor/base/
echo '+++++++++++++++++++++++++++++++++++++++++++++++++++'
echo '+++++++++++++++++++++++++++++++++++++++++++++++++++'
echo '_grid-settings.scss from _bitters-adjusted copied.'
echo '_base.scss from _bitters-adjusted copied.'
echo '+++++++++++++++++++++++++++++++++++++++++++++++++++'
echo '+++++++++++++++++++++++++++++++++++++++++++++++++++'
npm install
echo '++++++++++++++++++++++++++++'
echo '++++++++++++++++++++++++++++'
echo 'npm dependencies installed.'
echo '++++++++++++++++++++++++++++'
echo '++++++++++++++++++++++++++++'
gulp jade
echo '+++++++++++++++++++++++++++++++++++++++++++'
echo '+++++++++++++++++++++++++++++++++++++++++++'
echo 'gulp jade completed. The script ends here.'
echo '+++++++++++++++++++++++++++++++++++++++++++'
echo '+++++++++++++++++++++++++++++++++++++++++++'
