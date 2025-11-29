# pweb-back-projeto

# Para executar o container execute em sequencia:
podman machine init
podman machine start
podman stop pweb-back
podman rm pweb-back

podman rm mysql-pweb

podman run --name mysql-pweb \
  --network podman \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=pweb-projeto \
  -p 3306:3306 \
  -d docker.io/library/mysql:8

podman logs -f mysql-pweb

podman build --no-cache -t pweb-back .

podman run --rm --name api --env-file .env --network podman -p 3000:3000 pweb-back

