# PoC Redis Cluster
PoC Redis Cluster

## Apa yang kita butuhkan?
Berikut merupakan software dibutuhkan dan harus terinstall pada Windows:
1. Virtual Box ([https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads))
2. Vagrant ([https://www.vagrantup.com/](https://www.vagrantup.com/))

Vagrant digunakan untuk membuat _virtual machine_ di dalam Virtual Box

## Instalasi Vagrant
1. Buat sebuah folder dimanapun, misalnya VB
> F:\VB\
2. Kemudian, buka **Command Window** atau **CMD** pada direktori tersebut
3. Jalankan peritah berikut
> $ vagrant init joshfng/railsbox

> $ vagrant up

> $ vagrant ssh

Hingga tampilan berikut muncul

![alt text](https://github.com/zakyd/poc-redis-cluster/blob/master/assets/images/command-vagrant-ssh.PNG?raw=true "SSH Vagrant")

## Instalasi Redis pada SSH Vagrant
Jalankan _command_ berikut pada SSH Vagrant
> $ wget http://download.redis.io/releases/redis-4.0.10.tar.gz

> $ tar xzf redis-4.0.10.tar.gz

> $ cd redis-4.0.10

> $ make

> $ cd ..

> $ gem install redis

Sekarang redis sudah terinstall di dalam _virtual machine_

## Instalasi Redis Cluster
Gunakan konfigurasi pada [https://github.com/zakyd/poc-redis-cluster/tree/master/conf](https://github.com/zakyd/poc-redis-cluster/tree/master/conf), dan letakkan pada direktori Vagrant (F:\VB\\)
Kemudian buka 3 terminal (untuk 3 master, 0 slave) atau 6 terminal (untuk 3 master, 3 slave), dan jalankan _command_ berikut pada setiap terminal
> $ vagrant ssh

> $ ./redis-4.0.10/src/redis-server ../../vagrant/nodeX.conf

Catatan: nodeX.conf disesuaikan (contoh: node1.conf, node2.conf, node3.conf, node4.conf, node5.conf, node6.conf)

![alt text](https://github.com/zakyd/poc-redis-cluster/blob/master/assets/images/command-redis-server.PNG?raw=true "Redis Server")

Sehingga dapat dibuat Redis Cluster menggunakan _command_:
Untuk 3 master dan 0 slave:
> $ ./redis-4.0.10/src/redis-trib.rb create --replicas 0 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003

Untuk 3 master dan 3 slave:
> $ ./redis-4.0.10/src/redis-trib.rb create --replicas 1 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 127.0.0.1:7006

Setelah Redis Cluster berhasil dibuat, dapat dijalankan command:
> $ ./redis-4.0.10/src/redis-cli -c -p 7001

Dan Redis Cluster siap digunakan!

![alt text](https://github.com/zakyd/poc-redis-cluster/blob/master/assets/images/redis-set.PNG?raw=true "Redis Commands")

## Aplikasi Pendukung
Aplikasi Node JS pada [https://github.com/zakyd/poc-redis-cluster/blob/master/index.js](https://github.com/zakyd/poc-redis-cluster/blob/master/index.js) mendukung penggunaan Redis Cluster


author: zakyd