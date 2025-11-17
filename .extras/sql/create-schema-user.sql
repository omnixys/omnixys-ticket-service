-- Active: 1762704691875@@127.0.0.1@5432@shadow
CREATE SCHEMA IF NOT EXISTS "ticket" AUTHORIZATION "ticket";
ALTER ROLE "ticket" SET search_path = 'ticket';