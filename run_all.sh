#!/bin/bash

echo "Criando rede 'pweb-net' (caso não exista)..."
podman network exists pweb-net || podman network create pweb-net

echo "Removendo contêiner MySQL antigo (se existir)..."
podman rm -f mysql-pweb 2>/dev/null

echo "Subindo contêiner MySQL..."
podman run -d \
 --name mysql-pweb \
 --network pweb-net \
 -e MYSQL_ROOT_PASSWORD=root \
 -e MYSQL_DATABASE=pweb-projeto \
 -p 3306:3306 \
 docker.io/library/mysql:8

echo "⏳ Aguardando 15 segundos para o banco inicializar..."
sleep 15

echo "Removendo contêiner do backend antigo (se existir)..."
podman rm -f api-pweb 2>/dev/null

echo "Construindo imagem do backend..."
podman build --no-cache -t pweb-back .

echo "Subindo backend Node.js..."
podman run -d \
 --name api-pweb \
 --network pweb-net \
 --env-file .env \
 -p 3000:3000 \
 pweb-back

 podman ps

echo "Tudo rodando! Verifique os logs com: podman logs api-pweb"
