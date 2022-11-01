const colorBase = new Color('#98D2EB')

colorBase.set({
    'hsl.l': 80
})

const color = colorBase.toString({ format: 'hex' });

colorBase.set({
    'hsl.l': 40
})

const edgesColor = colorBase.toString({ format: 'hex' });