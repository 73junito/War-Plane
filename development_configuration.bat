{
    "typescript.preferences.noSemicolons": "off",
    "editor.tabSize": 4,
    "editor.insertSpaces": true,
    "files.eol": "\n",
    "typescript.format.semicolons": "insert",
    "editor.codeActionsOnSave": {
        "source.organizeImports": true
    },
    "typescript.preferences.importModuleSpecifier": "relative"
}

{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Flight Simulator",
            "skipFiles": ["<node_internals>/**"],
            "program": "${workspaceFolder}/dist/main.js",
            "preLaunchTask": "tsc: build",
            "outFiles": ["${workspaceFolder}/dist/**/*.js"],
            "console": "integratedTerminal"
        }
    ]
}