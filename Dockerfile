# Dockerfile for LOLAI Jekyll development
FROM ruby:3.2-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /site

# Copy Gemfile and install dependencies
COPY Gemfile* ./
RUN bundle install

# Copy the rest of the site
COPY . .

# Expose Jekyll default port
EXPOSE 4000

# Command to run Jekyll server
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload", "--drafts"]
