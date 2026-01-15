# Rust 构建阶段
FROM rust:1.75-slim as builder

WORKDIR /app

# 安装编译依赖
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# 复制 Cargo 文件
COPY Cargo.toml ./
COPY src ./src
COPY templates ./templates

# 构建应用（release 模式）
RUN cargo build --release

# 运行阶段
FROM debian:bookworm-slim

WORKDIR /app

# 安装运行时依赖
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

# 从构建阶段复制编译好的二进制文件
COPY --from=builder /app/target/release/tanggotyou /app/tanggotyou

# 复制静态文件和模板
COPY static ./static
COPY templates ./templates

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV RUST_LOG=tanggotyou=info,tower_http=info

# 运行应用
CMD ["/app/tanggotyou"]
