import type { ReactNode } from "react"
import type { FeatureId } from "@/content/site"
import type { MockSize } from "@/components/site/mocks/mock-primitives"
import { MockDocumentos } from "@/components/site/mocks/mock-documentos"
import { MockFirmas } from "@/components/site/mocks/mock-firmas"
import { MockGuias } from "@/components/site/mocks/mock-guias"
import { MockInicio } from "@/components/site/mocks/mock-inicio"
import { MockObligaciones } from "@/components/site/mocks/mock-obligaciones"
import { MockTramites } from "@/components/site/mocks/mock-tramites"

export {
  MockDocumentos,
  MockFirmas,
  MockGuias,
  MockInicio,
  MockObligaciones,
  MockTramites,
}

const registry: Record<FeatureId, (props: { size?: MockSize }) => ReactNode> = {
  inicio: MockInicio,
  tramites: MockTramites,
  obligaciones: MockObligaciones,
  documentos: MockDocumentos,
  firmas: MockFirmas,
  guias: MockGuias,
}

/** Renderiza el mock de una pantalla por su id (feature tour / hero). */
export function PortalMock({ id, size }: { id: FeatureId; size?: MockSize }) {
  const Mock = registry[id]
  return <Mock size={size} />
}
