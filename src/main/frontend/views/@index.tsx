import { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { HelloWorldService } from 'Frontend/generated/endpoints';


export default function Index() {
  const [name, setName] = useState('');
  const toastRef = useRef<Toast>(null);

  return (
    <div className="p-4 space-y-3">
      <Toast ref={toastRef} />

      <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />

      <Button
        label="Say hello"
        icon="pi pi-send"
        onClick={async () => {
          const serverResponse = await HelloWorldService.sayHello(name);
          toastRef.current?.show({
            severity: 'info',
            summary: 'Greeting',
            detail: serverResponse,
            life: 0,
          });
        }}
      />
    </div>
  );
}
