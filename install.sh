#! /bin/sh
# shellcheck disable=SC1090

npm install
 
case $SHELL in
    "/bin/zsh")
        CONFIG_FILE=".zshrc"
        ;;
    "/bin/bash")
        CONFIG_FILE=".bashrc"
        ;;
    "/bin/fish")
        CONFIG_FILE=".config/fish/config.fish"
        ;;
    *)
        CONFIG_FILE=".profile"
        ;;
esac

printf "alias meal='node %s'\n" "$(pwd)" >> "$HOME/$CONFIG_FILE"
. "$HOME/$CONFIG_FILE"
meal -h