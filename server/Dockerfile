FROM ghcr.io/astral-sh/uv:python3.14-alpine AS uv

# copy project
WORKDIR /app

ENV UV_COMPILE_BYTECODE=1
ENV UV_NO_INSTALLER_METADATA=1
ENV UV_LINK_MODE=copy
ENV UV_NO_DEV=1
ENV UV_TOOL_BIN_DIR=/usr/local/bin

# RUN --mount=type=cache,target=/root/.cache/uv \
#     --mount=type=bind,source=uv.lock,target=uv.lock \
#     --mount=type=bind,source=pyproject.toml,target=pyproject.toml \

# COPY --from=uv /uv /bin/uv

# copy project
WORKDIR /ppl
COPY ./src ./src
RUN ls
COPY ./uv.lock ./uv.lock
RUN ls
COPY ./pyproject.toml ./pyproject.toml

RUN uv sync --locked --no-install-project

ENV PATH="/app/.venv/bin:$PATH"
ENTRYPOINT []

CMD ["uv", "run", "python", "src/main.py"]