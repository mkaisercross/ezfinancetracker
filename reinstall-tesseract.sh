#!/bin/bash

phonegap plugin remove com.nvizo.tesseract
phonegap plugin add https://github.com/mkaisercross/tesseract-phonegap-plugin.git
cordova run android --device
