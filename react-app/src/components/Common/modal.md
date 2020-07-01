# How Modals & Modal Buttons Work

### xmodal.js (Modal component)
Setting: `props.render` to be `this` (aka this XModal)

`XModal a { render: a }`

### ymodalbutton.js (ModalButton component)
Assuming you passed in props with a modal property
when you create this, I assume you gave me
`modal: a`
and that `a` has a function called `showModal`

modalbutton is a component that returns
```
<Button icon="button-icon" onClick=a.showModal>Button text</Button>
```

### sidebar.js (aka wherever you want to put a button that opens a modal)

you need to
1. create a XModal
2. set a render property
3. since XModal.render gives you an object, you can take that object. 
we'll call it `a` (i.e. `render(a => do something with a)`)
4. in the "do something" we want to create YModalButton which is a button
that opens our modal 
5. YModalButton needs a property called modal. we will set modal=a


## In Summary
```
sidebar.js

<ClinkModal render={modal => (<NewModalButton modal={modal} />)} />
```

