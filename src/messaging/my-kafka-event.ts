// src/kafka/types/my-kafka-ticket.ts

/**
 * Beschreibt den Standard-Aufbau eines Kafka-Events im Omnixys-Ökosystem.
 * Alle Events enthalten Metadaten und einen Nutzlast-Body.
 */
export interface MyKafkaEvent<TPayload = unknown> {
  /** Eindeutige Ticket-ID (z. B. UUID v4) */
  id: string;

  /** Der Ticket-Typ, z. B. "ticket.created", "authentcation.login", ... */
  type: string;

  /** Zeitstempel (ISO 8601) */
  timestamp: string;

  /** Service, der das Ticket gesendet hat (z. B. "omnixys-authentication") */
  source: string;

  /** Nutzlast mit beliebigem Typ */
  payload: TPayload;

  /** Optionaler Trace-Kontext für verteilte Tracing-Systeme */
  trace?: {
    traceId: string;
    spanId?: string;
  };
}
