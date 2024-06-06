# Sử dụng hình ảnh Node chính thức với phiên bản 16
FROM node:16

# Đặt thư mục làm việc là /app
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn của dự án vào thư mục làm việc
COPY . .

# Xây dựng ứng dụng Strapi
RUN npm run build

# Mở cổng 1337 (mặc định của Strapi)
EXPOSE 3000

# Lệnh để khởi động Strapi
CMD ["npm", "run" , "dev"]
