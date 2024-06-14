import { generateUnsignedPsbtForInscription } from "@/utils/psbt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("************upload api called********");
  try {
      const body = await req.json();
      console.log(body,"hero");

     

      const {
        wallets,
        user,
      } = body;

      const {cardinal_address, cardinal_pubkey,wallet} = wallets;
     
      console.log({user});

      console.log({cardinal_address,cardinal_pubkey});

      const { psbt } = await generateUnsignedPsbtForInscription(
        cardinal_address,
        cardinal_pubkey,
        26,
        wallet,
        user,
      );
      console.log({ psbt });
    //   data.psbt = psbt;
     

      console.log("data:", body);
      return NextResponse.json({ message: 'Image uploaded successfully'});
  } catch (error: any) {
      console.error('Error uploading image:', error);
      return NextResponse.json({ message: 'Failed to upload image', error: error.message }, { status: 500 });
  }
}






