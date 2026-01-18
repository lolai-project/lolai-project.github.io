.PHONY: help start stop restart build clean logs shell test doctor update

# Цвета для вывода
GREEN  := \033[0;32m
YELLOW := \033[0;33m
NC     := \033[0m # No Color

help: ## Показать эту справку
	@echo "$(GREEN)LOLAI Development Commands$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'
	@echo ""

start: ## Запустить Jekyll сервер (http://localhost:4000)
	@echo "$(GREEN)Запуск Jekyll сервера...$(NC)"
	docker-compose up

start-bg: ## Запустить Jekyll в фоновом режиме
	@echo "$(GREEN)Запуск Jekyll в фоновом режиме...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)Сервер запущен на http://localhost:4000$(NC)"
	@echo "Используйте 'make logs' для просмотра логов"

stop: ## Остановить Jekyll сервер
	@echo "$(YELLOW)Остановка Jekyll сервера...$(NC)"
	docker-compose down

restart: ## Перезапустить Jekyll сервер
	@echo "$(YELLOW)Перезапуск Jekyll сервера...$(NC)"
	docker-compose restart

build: ## Пересобрать Docker образ
	@echo "$(GREEN)Пересборка Docker образа...$(NC)"
	docker-compose build --no-cache

rebuild: stop build start-bg ## Полная пересборка и запуск

clean: ## Очистить Jekyll кеш и build артефакты
	@echo "$(YELLOW)Очистка Jekyll кеша...$(NC)"
	docker-compose exec jekyll bundle exec jekyll clean || true
	rm -rf _site .jekyll-cache .jekyll-metadata
	@echo "$(GREEN)Очистка завершена$(NC)"

clean-all: stop clean ## Остановить сервер и очистить всё (включая volumes)
	@echo "$(YELLOW)Полная очистка (volumes, images)...$(NC)"
	docker-compose down -v
	@echo "$(GREEN)Полная очистка завершена$(NC)"

logs: ## Показать логи Jekyll сервера
	docker-compose logs -f jekyll

shell: ## Войти в shell контейнера
	@echo "$(GREEN)Вход в контейнер...$(NC)"
	docker-compose exec jekyll bash

test: ## Запустить Jekyll build (проверка на ошибки)
	@echo "$(GREEN)Проверка сборки...$(NC)"
	docker-compose exec jekyll bundle exec jekyll build

doctor: ## Запустить Jekyll doctor (диагностика)
	@echo "$(GREEN)Диагностика Jekyll...$(NC)"
	docker-compose exec jekyll bundle exec jekyll doctor

update: ## Обновить Ruby gems
	@echo "$(GREEN)Обновление зависимостей...$(NC)"
	docker-compose exec jekyll bundle update
	@echo "$(YELLOW)Требуется пересборка: make rebuild$(NC)"

ps: ## Показать статус контейнеров
	docker-compose ps

open: ## Открыть сайт в браузере
	@echo "$(GREEN)Открытие http://localhost:4000...$(NC)"
	@command -v xdg-open > /dev/null && xdg-open http://localhost:4000 || \
	 command -v open > /dev/null && open http://localhost:4000 || \
	 echo "$(YELLOW)Откройте вручную: http://localhost:4000$(NC)"

# Shortcuts
up: start-bg ## Alias для start-bg
down: stop ## Alias для stop
