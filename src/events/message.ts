import { OceanBubble } from "struts/oceanicbubble";
import Listener  from "../struts/listener";
import { Message, Uncached } from "oceanic.js";

import Database from "../database/database";
import { Member } from "../database/entity/member";

export default new Listener("messageCreate", false, async function(this: OceanBubble, msg: Message<Uncached>) {
    const manager = await Database.getInstance().getManager()

    if(msg.member?.id){
        if(msg.member?.bot === true) return;
        if(await manager.findOne(Member, {
            where: {
                MemberID: msg.member.id,
            }
        }) === null) {
            manager.save(Member, {
                MemberID: msg.member.id,
                lvl: 1,
                xp: 0
            })
        } else {
            var MemberDB = await manager.findOne(Member, {
                where: {
                    MemberID: msg.member.id
                }
            });

            if(MemberDB === null || undefined) return;
            
            // if(MemberDB){
            //     if(MemberDB.lvl === 0) {
            //         MemberDB.lvl = 1;
            //         manager.save(MemberDB);
            //     } else {
            //         var exp = Math.floor(Math.random() * 15) + 1;
            //         var lvlup = Math.floor(MemberDB.lvl * 50);
                    
            //         // Lvl: 1 exp: 100 
            //         // Lvl: 2 exp: 200
            //         // Lvl: 3 exp: 300

            //         MemberDB.xp = exp + MemberDB.xp;
            //         manager.save(MemberDB);

            //         if(MemberDB.xp > lvlup){
            //             MemberDB.lvl = MemberDB.lvl + 1;
            //             MemberDB.xp = 0;
            //             manager.save(MemberDB);

            //             this.rest.channels.createMessage(msg.channelID, {
            //                 content: `${msg.author.mention}, You Have leveled up to level ${MemberDB.lvl} and need ${lvlup + 50} xp`
            //             });
            //         }
            //     }
            // }
        }
    }
});