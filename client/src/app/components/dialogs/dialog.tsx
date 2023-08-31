

import React from "react";
import "./dialog.css";

export default function FormDialog( props ) {
   const 
      openned = () => {
         props.setOpen( true );
      };
   closed = () => {
      props.setOpen( false );
   };


   return (
      <Dialog
         open={ props.open }
         onClose={ closed }
         aria-labelledby="form-dialog-title"
      >
         <DialogTitle>Editar</DialogTitle>
         <DialogContent>
            <TextField
               autoFocus
               marging="dense"
               id="name"
               label="Nome do jogo:"
               type="text"
               fullWidth
               defaultValue={ props.name }
            />
            <TextField
               autoFocus
               marging="dense"
               id="category"
               label="Categoria:"
               type="text"
               fullWidth
               defaultValue={ props.category }
            />
            <TextField
               autoFocus
               marging="dense"
               id="cost"
               label="Preço:"
               type="text"
               fullWidth
               defaultValue={ props.cost }
            />
         </DialogContent>
         <DialogActions>
            <Button onClick={ closed }>
                    Cancel
            </Button>
            <Button onClick={ closed }>
                    Excluir
            </Button>
            <Button onClick={ closed }>
                    Salvar
            </Button>
         </DialogActions>
      </Dialog>
   );
}
