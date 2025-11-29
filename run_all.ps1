Write-Host "Criando rede 'pweb-net' (caso não exista)..."
$networkExists = podman network exists pweb-net

if (-not $networkExists) {
    podman network create pweb-net
}

Write-Host "Removendo contêiner MySQL antigo (se existir)..."
podman rm -f mysql-pweb 2>$null

Write-Host "Subindo contêiner MySQL..."
podman run -d `
 --name mysql-pweb `
 --network pweb-net `
 -e MYSQL_ROOT_PASSWORD=root `
 -e MYSQL_DATABASE=pweb-projeto `
 -p 3306:3306 `
 docker.io/library/mysql:8

Write-Host "⏳ Aguardando 15 segundos para o banco inicializar..."
Start-Sleep -Seconds 15

Write-Host "Removendo contêiner do backend antigo (se existir)..."
podman rm -f api-pweb 2>$null

Write-Host "Construindo imagem do backend..."
podman build -t pweb-back .

Write-Host "Subindo backend Node.js..."
podman run -d `
 --name api-pweb `
 --network pweb-net `
 --env-file .env `
 -p 3000:3000 `
 pweb-back

podman ps

Write-Host "Tudo rodando! Verifique os logs com: podman logs api-pweb"
