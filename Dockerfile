
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci && npm install sharp


FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build


FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production


COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/src/pages ./src/pages

ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000

# CMD ["npm", "run", "dev"]


# # Stage 1: Install dependencies only when needed
# FROM node:18-alpine AS deps
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm ci && npm install sharp

# # Stage 2: Build the Next.js application
# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY . .
# COPY --from=deps /app/node_modules ./node_modules
# RUN npm run build

# # Stage 3: Prepare the production image
# FROM node:18-alpine AS runner
# WORKDIR /app

# # Set production environment variable
# ENV NODE_ENV production

# # Only copy required files for the production build
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# # Expose port and start Next.js in production mode
# EXPOSE 3000
CMD ["npm", "start"]

