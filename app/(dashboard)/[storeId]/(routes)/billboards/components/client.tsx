'use client';

import {Plus} from 'lucide-react';
import {useParams, useRouter} from 'next/navigation';

import {Button} from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import {Separator} from '@/components/ui/separator';

export const BillboardClient = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title='Billboards (0)'
          description='Manage billboards for your store'
        />
        <Button>
          <Plus />
          Add New
        </Button>
      </div>
      <Separator />
    </>
  );
};
