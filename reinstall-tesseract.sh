#!/bin/bash

phonegap plugin remove com.nvizo.receiptocr
#phonegap plugin add /var/www/html/tesseract-phonegap-plugin/
phonegap plugin add https://github.com/mkaisercross/tesseract-phonegap-plugin
phonegap --verbose cordova run android --device

