echo "Parando todos os contêineres..."
podman stop -a

echo "Removendo todos os contêineres..."
podman rm -a

echo "Removendo todas as imagens..."
podman rmi -a

echo "Limpando volumes não utilizados..."
podman volume prune -f

echo "Limpando redes customizadas não utilizadas..."
podman network prune -f

echo "Limpeza completa do ambiente Podman!"
