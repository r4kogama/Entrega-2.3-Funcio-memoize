# Entrega-2.3-Funcio-memoize


# Comandos de instalacion de TS y Jest

### Si se quiere instalar en global ejecutar estos scripts, la instalacion de npm es mejor en global con esto instalas ultima version npm 

```sh
npm install -g npm@latest
```

### Install typescript global [opcional]

```sh
npm i -g typescript
```

## Para proyectos en desarrollo una instalacion en local en el proyecto

### Dentro del proyecto:
### Creacion  package json

```sh
npm init -y
```

### Dependencias y typescripts

```sh
npm i --save-dev typescript
```

### instalar biblioteca TS [tsconfig.json]

```sh
npx tsc --init
```

### installar los tipos de node si no lo tiene

```sh
npm install --save-dev @types/node
```

### En el package.json:

```sh

 "scripts":{
	"tsc": "tsc"
}

```

### Instalacion de jest para los test unitarios u otros

```sh
npm install jest -D (desarrollo)
npm install --save-dev ts-jest
```

### intallar tipos de jest para ts

```sh
npm i -D @types/jest ts-jest  
```

### En el package.json:

```sh

"jest": {
    "preset": "ts-jest",
    "verbose": true,
    "testEnvironment": "node",
    "moduleFileExtensions": [
      "ts", "tsx", "js", "jsx", "json", "node"
    ],
    "coveragePathIgnorePatterns": [
      "/node_modules/",
      "/dist/"
    ]
  }

```
### Executar lost test 

```sh
npm run test
```