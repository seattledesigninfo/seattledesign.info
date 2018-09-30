#!/bin/bash

# Make Seattle Design image
convert -background white -fill blue -font RobotoMono-Regular -size 210x200 -pointsize 48 -gravity west label:'Seattle\nDesign' design.png

# Make background
convert -background white -fill white -font RobotoMono-Regular -size 600x315 -pointsize 1 -gravity west label:'...' designbg.png

# Merge the two into one
convert designbg.png design.png -gravity center -composite output.png
