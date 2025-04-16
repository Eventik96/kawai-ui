# Stage 1: Build is already done manually

# Stage 2: Serve with nginx
FROM nginx:alpine

# Másold az Angular build fájlokat
COPY dist/your-project-name /usr/share/nginx/html

# Saját nginx konfig betöltése
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
