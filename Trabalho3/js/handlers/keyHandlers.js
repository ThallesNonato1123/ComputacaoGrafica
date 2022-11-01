let keys = []

const actions = {
    w: () => head.rotate('y', 0.1),
    W: () => head.rotate('y', -0.1),
    e: () => arms.right.rotate('x', -0.1),
    E: () => arms.right.rotate('x', 0.1),
    d: () => forearms.right.rotate('x', -0.1),
    D: () => forearms.right.rotate('x', 0.1),
    c: () => hands.right.rotate('y', -0.1),
    C: () => hands.right.rotate('y', 0.1),
    q: () => arms.left.rotate('x', -0.1),
    Q: () => arms.left.rotate('x', 0.1),
    a: () => forearms.left.rotate('x', -0.1),
    A: () => forearms.left.rotate('x', 0.1),
    z: () => hands.left.rotate('y', -0.1),
    Z: () => hands.left.rotate('y', 0.1),
    u: () => legs.left.rotate('x', -0.1),
    U: () => legs.left.rotate('x', 0.1),
    j: () => calfs.left.rotate('x', -0.1),
    J: () => calfs.left.rotate('x', 0.1),
    n: () => foots.left.rotate('y', -0.1),
    N: () => foots.left.rotate('y', 0.1),
    o: () => legs.right.rotate('x', -0.1),
    O: () => legs.right.rotate('x', 0.1),
    l: () => calfs.right.rotate('x', -0.1),
    L: () => calfs.right.rotate('x', 0.1),
    m: () => foots.right.rotate('y', -0.1),
    M: () => foots.right.rotate('y', 0.1),
}

const onKeyDown = ({ key }) => {
    if (!keys.includes(key)) keys.push(key);

    keys.forEach(key =>{
        const action = actions[key];

        if(action) action()
    })
};

const onKeyUp = ({ key }) => keys = keys.filter(k => key !== k);