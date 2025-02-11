# Use official PHP 8.2 base image
FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    git \
    unzip \
    && docker-php-ext-install pdo_mysql zip intl

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www/html

COPY . /var/www/html

COPY .env.example .env

RUN composer install --no-dev --optimize-autoloader

EXPOSE 8000

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage

CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
