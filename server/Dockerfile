FROM ruby:3.2.2

# Устанавливаем системные зависимости
RUN apt-get update -qq && \
    apt-get install -y nodejs postgresql-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем Gemfile и Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Устанавливаем Ruby Gems
RUN bundle install

# Копируем все файлы приложения в рабочую директорию
COPY . .

# Открываем порт 3000 для веб-трафика
EXPOSE 3000

# Запускаем сервер Rails
CMD ["rails", "server", "-b", "0.0.0.0"]
