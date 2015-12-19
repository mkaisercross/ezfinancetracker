#!/bin/bash

phonegap plugin remove com.nvizo.receiptocr
phonegap plugin add /var/www/html/tesseract-phonegap-plugin/
phonegap --verbose cordova run android --device

