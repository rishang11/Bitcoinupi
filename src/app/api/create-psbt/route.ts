import { generateUnsignedPsbtForInscription } from "@/utils/psbt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("************upload api called********");
  try {
      const body = await req.json();
      console.log(body,"hero");

     

      const {
        cardinal_address,
        cardinal_pubkey,
        ordinal_address,
        ordinal_pubkey,
        wallet,
        inputs,
      } = body;

      const { psbt } = await generateUnsignedPsbtForInscription(
        cardinal_address,
        cardinal_pubkey,
        265,
        wallet,
        [inputs],
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






