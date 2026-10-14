import { Folder, LayoutGrid, List, RefreshCw, Upload } from "lucide-react"
import { mockDocumentos, mockPortalLabels } from "@/content/mocks"
import {
  MockCard,
  MockOutlineButton,
  MockPageTitle,
  MockShell,
  type MockSize,
} from "@/components/site/mocks/mock-primitives"

export function MockDocumentos({ size = "default" }: { size?: MockSize }) {
  const { breadcrumbs, entries } = mockDocumentos

  return (
    <MockShell active={mockDocumentos.activeNav} size={size}>
      <MockPageTitle
        action={
          <div className="flex items-center gap-1.5">
            <MockOutlineButton icon={Upload}>{mockPortalLabels.documentos.upload}</MockOutlineButton>
            <MockOutlineButton icon={RefreshCw}>Actualizar</MockOutlineButton>
          </div>
        }
      >
        {breadcrumbs[breadcrumbs.length - 1]?.label ?? mockPortalLabels.documentos.title}
      </MockPageTitle>

      <div className="mb-3 flex items-center gap-2">
        <div className="h-6 flex-1 rounded-md border border-m-border bg-m-card px-2 text-[10px] leading-6 text-m-fg-muted">
          Buscar en esta carpeta
        </div>
        <span className="inline-flex h-6 items-center gap-0.5 rounded-md border border-m-border bg-m-card p-0.5">
          <span className="inline-flex size-5 items-center justify-center rounded bg-primary/15 text-accent-on-light">
            <LayoutGrid className="size-3" />
          </span>
          <span className="inline-flex size-5 items-center justify-center text-m-fg-muted">
            <List className="size-3" />
          </span>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 @min-[34rem]:grid-cols-3">
        {entries.map((entry) => (
          <MockCard key={entry.id} className="overflow-hidden">
            <div className="flex h-14 items-center justify-center bg-primary/5 @min-[36rem]:h-16">
              <Folder className="size-8 text-primary" />
            </div>
            <div className="px-2.5 py-2">
              <p className="truncate font-semibold">{entry.name}</p>
              <p className="truncate text-[10px] text-m-fg-muted">
                Carpeta · {entry.modifiedAt}
              </p>
            </div>
          </MockCard>
        ))}
      </div>
    </MockShell>
  )
}
