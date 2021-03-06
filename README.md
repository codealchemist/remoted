# remoted [![Build Status](https://travis-ci.org/codealchemist/remoted.svg?branch=master)](https://travis-ci.org/codealchemist/remoted)

Remotely run commands on clients.

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

![screenshot](https://cldup.com/OIehl_lEwM.gif)

## Install

`npm install -g remoted`

## About

**remoted** lets you start hosts and guests.

Hosts are machine that can be remotely controlled.

Guests are machines that will send commands to hosts.

When a guest connects to a host a command line interface will be provided.

These machines can found each other by sending UDP messages with some help
from [udp-node](https://github.com/codealchemist/udp-node).

You can run normal shell commands on the host and get their output.

You can open applications and documents.

And there are some built-in commands for you to enjoy, allowing you to
send OS notifications and play audio.

## Usage

Start a host on one machine with:

`remoted --host [hostname]`

Start a guest on a another machine instructing it to
connect to your host:

`remoted [hostname]`

**NOTE:**

Hosts and guests will discover each other no matter which one is
started first ;)

## Built-In Commands

On a host connected to a guest you can use any of the following
commands:

- `notify [message]`: Sends OS notifications using
  [https://github.com/mikaelbr/node-notifier](https://github.com/mikaelbr/node-notifier)
- `exit`: Kills host and guest.

## OS Commands

These are some of the most commonly used OS commands:

- `open [url]`: Opens passed URL in the default browser.
- `open [path/file]`: Opens file with default application for its type.
- `cat [path/file]`: Outputs raw content of the file.
- `ls`: List files on the directory where guest was started.

You can remotely run any command that the OS supports.

TODO:
VLC
ln -s /Applications/VLC.app/Contents/MacOS/VLC /usr/local/bin/vlc
