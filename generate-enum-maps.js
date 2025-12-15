import fs from "fs";

async function generateEnumDescriptions() {
  const swaggerText = fs.readFileSync("swagger.json", "utf-8");
  const swagger = JSON.parse(swaggerText);

  let imports= [];
  let output = `// Auto-generated from Swagger x-enumDescriptions\n\n`;

  for (const [key, schema] of Object.entries(swagger.components.schemas)) {
    if (schema.enum && schema["x-enumNames"] && schema["x-enumDescriptions"]) {
      const enumName = key;
      const names = schema["x-enumNames"];
      const descs = schema["x-enumDescriptions"];

      // Import listesine ekle
      imports.push(enumName);

      output += `export const ${enumName}Descriptions: Record<${enumName}, string> = {\n`;
      names.forEach((name, i) => {
        output += `  [${enumName}.${name}]: "${descs[i]}",\n`;
      });
      output += "};\n\n";
    }
  }

  // Importları başa ekle
  let finalOutput = `// Auto-generated from Swagger x-enumDescriptions\n\n`;
  if (imports.length > 0) {
    finalOutput += `import { ${imports.join(", ")} } from "./apiDtos";\n\n`;
  }
  finalOutput += output;

  fs.writeFileSync("src/api/extra-enums.ts", finalOutput, "utf-8");
  console.log("✅ extra-enums.ts generated!");
}

generateEnumDescriptions();
