import { NgModule } from "@angular/core";
import { TranslatePipe } from "./translate/translate.pipe";

@NgModule({
  declarations: [TranslatePipe],
  exports: [TranslatePipe],
})
export class PipeModule {}
