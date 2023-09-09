'use client';

import * as z from 'zod';
import axios from 'axios';
import {useState} from 'react';
import {Trash} from 'lucide-react';
import {toast} from 'react-hot-toast';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useParams, useRouter} from 'next/navigation';

import {Store} from '@prisma/client';
import {Input} from '@/components/ui/input';
import Heading from '@/components/ui/heading';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import AlertModal from '@/components/modals/alert-modal';
import {ApiAlert} from '@/components/ui/api-alert';
import {useOrigin} from '@/hooks/use-origin';

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({initialData}) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success('Store Name updated!');
    } catch (error) {
      toast.error('something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push('/');
      toast.success('store deleted!');
    } catch (error) {
      toast.error('Make sure you removed all products and categories first.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className='flex items-center justify-between'>
        <Heading title='settings' description='Manage store preferences' />
        <Button variant='destructive' size='sm' onClick={() => setOpen(true)}>
          <Trash className='h-4 w-4' size='icon' />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'>
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Store name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title='test'
        description={`${origin}/api/${params.storeId}`}
        variant='public'
      />
    </>
  );
};

export default SettingsForm;
