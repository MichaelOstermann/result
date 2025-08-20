import type { TreeShakeImportResolver } from "@monstermann/tree-shake-import-namespaces"

const treeshake: TreeShakeImportResolver = function ({ importAlias, importName, importPath, propertyName }) {
    if (importPath === "@monstermann/result" && (importName === "Result" || importName === "ResultAsync"))
        return `import { ${propertyName} as ${importAlias} } from "@monstermann/result/Result/${propertyName}.js"`
    return undefined
}

export default treeshake
