FROM mysql:latest

# Create a directory for initializing scripts
RUN mkdir -p /docker-entrypoint-initdb.d

# Copy the initialization script to the container
COPY ./init.sql /docker-entrypoint-initdb.d/

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=root123@
ENV MYSQL_DATABASE=STREAMCREW

# Expose port 3306
EXPOSE 3306

# Start MySQL server
CMD ["mysqld"]